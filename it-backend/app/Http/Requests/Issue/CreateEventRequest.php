<?php

namespace App\Http\Requests\Issue;

use App\Models\Issue\Actions\CreateEvent;
use App\Models\Issue\IssueLevel;
use App\Models\Project\Project;
use BenSampo\Enum\Rules\EnumValue;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Log;

class CreateEventRequest extends FormRequest
{
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
            'project_id' => 'required', // value from middleware
            'project_environment_id' => 'required', // value from middleware
            'programming_language' => 'required|min:1',
            'level' => ['nullable', new EnumValue(IssueLevel::class)],
            'exception_name' => 'required|min:1',
            'filename' => 'required|min:1',
            'message' => 'required|min:1',
            'stacktrace' => 'required|min:1',
            'source_code_fragment' => 'nullable',
            'fragment_starting_line' => 'nullable|numeric',
            'line' => 'required|numeric',
        ];
    }

    public function perform()
    {
        $parameters = $this->validated();

        $project = Project::query()->find($parameters['project_id']);
        if ($project->status !== 'active') {
            return response()->json(['message' => 'Project is not active'], 422);
        }

        if (!isset($parameters['level'])) {
            $parameters['level'] = IssueLevel::ERROR;
        }

        $response = CreateEvent::perform($parameters);
        if ($response['status_code'] !== 200) {
            return response()->json([
                'message' => 'Failed to create issue event!',
                'error' => $response['error'],
            ], 422);
        }

        return response()->json(['message' => 'Issue successfully created'], 200);
    }
}
