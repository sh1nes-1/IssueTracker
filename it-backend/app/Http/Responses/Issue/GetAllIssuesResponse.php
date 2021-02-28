<?php


namespace App\Http\Responses\Issue;

class GetAllIssuesResponse
{
    private $issues;
    private $total_count;

    public function __construct($issues, $total_count)
    {
        $this->issues = $issues->map(\Closure::fromCallable([$this, 'mapIssue']));
        $this->total_count = $total_count;
    }

    public static function from($issues, $total_count)
    {
        return new static($issues, $total_count);
    }

    public function toArray()
    {
        return [
            'issues'      => $this->issues,
            'total_count' => $this->total_count,
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
            'last_seen'      => $issue->updated_at,
            'programming_language' => $issue->programmingLanguage->name,
        ];
    }
}
