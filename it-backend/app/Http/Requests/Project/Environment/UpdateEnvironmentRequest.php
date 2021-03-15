<?php

namespace App\Http\Requests\Project\Environment;

use App\Http\Responses\Project\Environment\UpdateEnvironmentResponse;
use App\Models\Project\Environment\ProjectEnvironment;
use Illuminate\Foundation\Http\FormRequest;

class UpdateEnvironmentRequest extends FormRequest
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
        $environment_id = $this->route('id');
        $environment = ProjectEnvironment::query()->find($environment_id);

        $rules = [];

        if ($environment->name != $this->get('name')) {
            $rules['name'] = 'required|string|min:3|max:32|unique:project_environments,name,NULL,id,project_id,'.$environment->project_id;
        }

        return $rules;
    }

    public function perform()
    {
        $environment_id = $this->route('id');
        $environment = ProjectEnvironment::query()->find($environment_id);

        if ($environment->status !== 'active') {
            return response()->json(['message' => 'Environment is not active'], 422);
        }

        $environment->update($this->validated());
        $environment_formatted = UpdateEnvironmentResponse::from($environment->refresh())->toArray();
        return response()->json($environment_formatted, 200);
    }
}
