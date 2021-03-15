<?php


namespace App\Http\Responses\Project\Environment;

class DeleteEnvironmentResponse
{
    private $environment;

    public function __construct($environment)
    {
        $this->environment = $environment;
    }

    public static function from($environment)
    {
        return new static($environment);
    }

    public function toArray()
    {
        return [
            'message' => 'Environment deleted successfully',
            'environment' => [
                'id'           => $this->environment->id,
                'name'         => $this->environment->name,
            ]
        ];
    }
}
