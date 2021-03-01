<?php


namespace App\Http\Responses\Project\Environment;

class UpdateEnvironmentResponse
{
    private $environment;

    public function __construct($environment)
    {
        $this->environment = $environment;
    }

    public static function from($project)
    {
        return new static($project);
    }

    public function toArray()
    {
        return [
            'message' => 'Environment updated successfully',
            'project' => [
                'id' => $this->environment->id,
                'name' => $this->environment->name,
            ]
        ];
    }
}
