<?php

namespace App\Http\Requests\Project\Environment;

use App\Http\Responses\Project\Environment\CreateEnvironmentResponse;
use App\Models\Project\Environment\Actions\GenerateSecretKey;
use App\Models\Project\Project;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class CreateEnvironmentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        $project_id = $this->get('project_id');
        return auth()->user()->hasProject($project_id);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $project_id = $this->get('project_id');

        return [
            'name' => 'required|string|min:3|max:32|unique:project_environments,name,NULL,id,project_id,'.$project_id,
        ];
    }

    public function perform()
    {
        $project_id = $this->get('project_id');
        $project = Project::query()->find($project_id);

        $secret_key_response = GenerateSecretKey::perform();
        if ($secret_key_response['status_code'] !== 200) {
            return response()->json(['message' => 'Failed to create environment. Please try again later.'], 422);
        }

        $environment = $project->environments()->create([
            'name'       => $this->get('name'),
            'secret_key' => $secret_key_response['secret_key'],
        ]);

        $environment_formatted = CreateEnvironmentResponse::from($environment)->toArray();
        return response()->json($environment_formatted, 200);
    }
}
