<?php


namespace App\Http\Responses\Project;

class CreateProjectResponse
{
    private $project;

    public function __construct($project)
    {
        $this->project = $project;
    }

    public static function from($project)
    {
        return new static($project);
    }

    public function toArray()
    {
        return [
            'message' => 'Project created successfully',
            'project' => [
                'id' => $this->project->id,
                'name' => $this->project->name,
            ]
        ];
    }
}
