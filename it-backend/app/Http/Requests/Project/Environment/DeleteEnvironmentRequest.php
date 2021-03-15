<?php

namespace App\Http\Requests\Project\Environment;

use App\Http\Responses\Project\Environment\DeleteEnvironmentResponse;
use App\Models\Project\Environment\ProjectEnvironment;
use Illuminate\Foundation\Http\FormRequest;

class DeleteEnvironmentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        $id = $this->route('id');
        $project_environment = ProjectEnvironment::query()->find($id);
        return $project_environment && $project_environment->isUserAuthorized(auth()->user()->id);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            //
        ];
    }

    public function perform()
    {
        $environment_id = $this->route('id');
        $environment = ProjectEnvironment::query()->find($environment_id);

        if ($environment->status !== 'active') {
            return response()->json(['message' => 'Environment is not active'], 422);
        }

        $environment->update(['status' => 'deleted']);

        $environment_formatted = DeleteEnvironmentResponse::from($environment)->toArray();
        return response()->json($environment_formatted, 200);
    }
}
