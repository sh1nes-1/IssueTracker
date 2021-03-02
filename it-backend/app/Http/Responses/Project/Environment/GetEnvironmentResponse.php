<?php


namespace App\Http\Responses\Project\Environment;

class GetEnvironmentResponse
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
            'environment' => [
                'id' => $this->environment->id,
                'name' => $this->environment->name,
                'secret_key' => $this->environment->secret_key,
            ]
        ];
    }
}
