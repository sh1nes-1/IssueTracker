<?php

namespace App\Http\Requests\Project;

use App\Http\Responses\Project\GetProjectResponse;
use App\Models\Project\Project;
use Illuminate\Foundation\Http\FormRequest;

class GetProjectRequest extends FormRequest
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
        return [
            //
        ];
    }

    public function perform()
    {
        $project_id = $this->route('id');
        $project = Project::query()->find($project_id);
        $project_formatted = GetProjectResponse::from($project)->toArray();
        return response()->json($project_formatted, 200);
    }
}
