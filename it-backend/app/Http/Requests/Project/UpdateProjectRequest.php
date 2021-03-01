<?php

namespace App\Http\Requests\Project;

use App\Http\Responses\Project\UpdateProjectResponse;
use App\Models\Project\Project;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpdateProjectRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        $project_id = $this->route('id');
        return auth()->user()->hasProject($project_id);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $project_id = $this->route('id');
        $project = Project::query()->find($project_id);

        $rules = [];

        if ($project->name != $this->get('name')) {
            $rules['name'] = 'required|string|min:3|max:32|unique:projects,name,NULL,id,user_id,'.Auth::id();
        }

        return $rules;
    }

    public function perform()
    {
        $project_id = $this->route('id');
        $project = Project::query()->find($project_id);
        $project->update($this->validated());
        $project_formatted = UpdateProjectResponse::from($project->refresh())->toArray();
        return response()->json($project_formatted, 200);
    }
}
