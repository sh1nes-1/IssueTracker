<?php


namespace App\Http\Responses\Project;

class GetProjectResponse
{
    private $project;
    private $environments;

    public function __construct($project)
    {
        $this->project = $project;
        $this->environments = $this->project->environments->map(\Closure::fromCallable([$this, 'mapEnvironment']));
    }

    public static function from($project)
    {
        return new static($project);
    }

    public function toArray()
    {
        return [
            'id'           => $this->project->id,
            'name'         => $this->project->name,
            'environments' => $this->environments,
        ];
    }

    private function mapEnvironment($environment)
    {
        return [
            'id'   => $environment->id,
            'name' => $environment->name,
        ];
    }
}
