<?php

namespace App\Models\Project\Environment\Actions;

use App\Models\Project\Environment\ProjectEnvironment;
use Illuminate\Support\Str;

class GenerateSecretKey
{
    private $secret_key;

    public static function perform()
    {
        return (new static())->handle();
    }

    public function handle()
    {
        try {
            $this->generateSecretKey();

            return [
                'status_code' => 200,
                'secret_key'  => $this->secret_key,
            ];
        }
        catch (\Exception $exception) {
            return [
                'status_code' => 422,
            ];
        }
    }

    public function generateSecretKey()
    {
        do {
            $this->secret_key = Str::random(64);
            $project_environment = ProjectEnvironment::query()->where('secret_key', $this->secret_key)->first();
        } while (!empty($project_environment));
    }
}
