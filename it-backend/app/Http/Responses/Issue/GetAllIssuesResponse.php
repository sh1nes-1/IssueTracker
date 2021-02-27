<?php


namespace App\Http\Responses\Issue;

class GetAllIssuesResponse
{
    private $issues;

    public function __construct($issues)
    {
        $this->issues = $issues->map(\Closure::fromCallable([$this, 'mapIssue']));
    }

    public static function from($issues)
    {
        return new static($issues);
    }

    public function toArray()
    {
        return [
            'issues' => $this->issues,
        ];
    }

    private function mapIssue($issue)
    {
        return [
            'id'             => $issue->id,
            'short_id'       => $issue->short_id,
            'level'          => $issue->level,
            'exception_name' => $issue->exception_name,
            'filename'       => $issue->filename,
            'message'        => $issue->message,
            'events'         => $issue->events()->count(),
            'is_resolved'    => $issue->is_resolved,
            'first_seen'     => $issue->created_at,
            'last_seen'      => $issue->events()->latest()->first()->created_at,
            'programming_language' => $issue->programmingLanguage->name,
        ];
    }
}
