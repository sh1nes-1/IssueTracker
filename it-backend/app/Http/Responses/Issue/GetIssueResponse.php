<?php


namespace App\Http\Responses\Issue;

class GetIssueResponse
{
    private $issue;
    private $event;
    private $prev_event;
    private $next_event;

    public function __construct($issue, $event)
    {
        $this->issue = $issue;
        $this->event = $event;
        $this->prev_event = $issue->events()->where('id', '<', $event->id)->orderByDesc('id')->first();
        $this->next_event = $issue->events()->where('id', '>', $event->id)->orderBy('id')->first();
    }

    public static function from($issue, $event)
    {
        return new static($issue, $event);
    }

    public function toArray()
    {
        $issue = $this->issue;
        $event = $this->event;
        $prev_event_id = empty($this->prev_event) ? null : $this->prev_event->id;
        $next_event_id = empty($this->next_event) ? null : $this->next_event->id;

        return [
            'issue' => [
                'id'             => $issue->id,
                'project_id'     => $issue->projectEnvironment->project_id,
                'short_id'       => $issue->short_id,
                'level'          => $issue->level,
                'exception_name' => $issue->exception_name,
                'filename'       => $issue->filename,
                'message'        => $issue->message,
                'events'         => $issue->events()->count(),
                'is_resolved'    => $issue->is_resolved,
                'is_ignored'     => $issue->is_ignored,
                'first_seen'     => $issue->created_at,
                'last_seen'      => $issue->updated_at,
                'programming_language' => $issue->programmingLanguage->name,
                'event' => [
                    'id'         => $event->id,
                    'stacktrace' => $event->stacktrace,
                    'created_at' => $event->created_at,
                ],
                'prev_event_id' => $prev_event_id,
                'next_event_id' => $next_event_id,
            ]
        ];
    }
}
