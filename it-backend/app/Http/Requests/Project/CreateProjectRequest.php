<?php

namespace App\Http\Requests\Project;

use App\Http\Responses\Project\CreateProjectResponse;
use App\Models\Project\Environment\Actions\CreateProjectEnvironment;
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
            'name' => 'required|string|min:3|max:32|unique:projects,name,NULL,id,user_id,'.Auth::id(),
        ];
    }

    public function perform()
    {
        $project = auth()->user()->projects()->create($this->validated());
        CreateProjectEnvironment::perform(self::DEFAULT_PROJECT_ENVIRONMENT, $project->id);

        $project_formatted = CreateProjectResponse::from($project->refresh())->toArray();
        return response()->json($project_formatted, 201);
    }
}
