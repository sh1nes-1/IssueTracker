<?php


namespace App\Http\Responses\Project;

class GetAllProjectsResponse
{
    private $projects;

    public function __construct($projects)
    {
        $this->projects = $projects->map(\Closure::fromCallable([$this, 'mapProject']));
    }

    public static function from($projects)
    {
        return new static($projects);
    }

    public function toArray()
    {
        return [
            'projects' => $this->projects,
        ];
    }

    private function mapProject($project)
    {
        return [
            'id'         => $project->id,
            'name'       => $project->name,
            'created_at' => $project->created_at,
        ];
    }
}
