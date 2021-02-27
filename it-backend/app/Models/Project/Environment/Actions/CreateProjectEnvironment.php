<?php

namespace App\Models\Project\Environment\Actions;

use App\Models\Project\Environment\ProjectEnvironment;
use Illuminate\Support\Str;

class CreateProjectEnvironment
{
    private $name;
    private $project_id;

    public function __construct($name, $project_id)
    {
        $this->name = $name;
        $this->project_id = $project_id;
    }

    public static function perform($name, $project_id)
    {
        return (new static($name, $project_id))->handle();
    }

    public function handle()
    {
        try {
            $project_environment = $this->createProjectEnvironment();
            return [
                'status_code'         => 200,
                'project_environment' => $project_environment,
            ];
        }
        catch (\Exception $exception) {
            return [
                'status_code' => 422,
            ];
        }
    }

    public function createProjectEnvironment()
    {
        return ProjectEnvironment::query()->create([
           'name'       => $this->name,
           'project_id' => $this->project_id,
           'secret_key' => Str::random()
        ]);
    }
}
