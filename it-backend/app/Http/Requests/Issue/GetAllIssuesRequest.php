<?php

namespace App\Http\Requests\Issue;

use App\Http\Responses\Issue\GetAllIssuesResponse;
use App\Models\Issue\Actions\GetProjectIssues;
use App\Models\Project\Project;
use App\Rules\CsvArrayRule;
use Illuminate\Foundation\Http\FormRequest;

class GetAllIssuesRequest extends FormRequest
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
        return [
            'project_id' => 'required|exists:projects,id',
            'environments_ids' => [
                'nullable',
                new CsvArrayRule('numeric'),
            ],
        ];
    }

    public function perform()
    {
        $project_id = $this->get('project_id');

        $project = Project::query()->find($project_id);
        if ($project->status !== 'active') {
            return response()->json(['message' => 'Project is not active'], 422);
        }

        $response = GetProjectIssues::perform($project_id, $this->all());
        if ($response['status_code'] !== 200) {
            return response()->json([
                'message' => 'Failed to get issues. Please try again later.',
                'error' => $response['error'],
            ], 422);
        }

        $issues_formatted = GetAllIssuesResponse::from($response['issues'], $response['total_count'])->toArray();
        return response()->json($issues_formatted, 200);
    }
}
