<?php

namespace App\Http\Requests\Project;

use App\Http\Responses\Project\CreateProjectResponse;
use App\Models\Project\Environment\Actions\GenerateSecretKey;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class CreateProjectRequest extends FormRequest
{
    const DEFAULT_PROJECT_ENVIRONMENT = 'development';

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required|string|min:3|max:32'
        ];
    }

    public function perform()
    {
        $user = auth()->user();
        $name = $this->get('name');

        $project_with_same_name = $user->projects()
            ->where('name', $name)
            ->where('status', 'active')
            ->first();

        if ($project_with_same_name !== null) {
            return response()->json(['message' => 'Failed to create project with that name.'], 422);
        }

        $secret_key_response = GenerateSecretKey::perform();
        if ($secret_key_response['status_code'] !== 200) {
            return response()->json(['message' => 'Failed to create project. Please try again later.'], 422);
        }

        $project = $user->projects()->create($this->validated());
        $project->environments()->create([
            'name'       => self::DEFAULT_PROJECT_ENVIRONMENT,
            'secret_key' => $secret_key_response['secret_key'],
        ]);

        $project_formatted = CreateProjectResponse::from($project->refresh())->toArray();
        return response()->json($project_formatted, 201);
    }
}
