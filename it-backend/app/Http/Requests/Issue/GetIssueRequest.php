<?php

namespace App\Http\Requests\Issue;

use App\Http\Responses\Issue\GetIssueResponse;
use App\Models\Issue\Event;
use App\Models\Issue\Issue;
use Illuminate\Foundation\Http\FormRequest;

class GetIssueRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        $id = $this->route('id');
        $issue = Issue::query()->find($id);
        return $issue && $issue->isUserAuthorized(auth()->user()->id);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'event_id' => 'nullable|exists:events,id'
        ];
    }

    public function perform()
    {
        $id = $this->route('id');
        $issue = Issue::query()->find($id);

        $event_id = $this->get('event_id');
        $events_query = $issue->events();

        if (!empty($event_id)) {
            $events_query->where('id', $event_id);
        } else {
            $events_query->latest();
        }

        $event = $events_query->first();
        if (empty($event)) {
            return response()->json(['message' => 'Event not found in given issue'], 404);
        }

        $issue_formatted = GetIssueResponse::from($issue, $event)->toArray();
        return response()->json($issue_formatted, 200);
    }
}
