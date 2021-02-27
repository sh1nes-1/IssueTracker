<?php

namespace App\Models\Issue\Actions;

use App\Models\Issue\Issue;
use App\Models\ProgrammingLanguage;
use App\Models\Project\Project;
use Illuminate\Support\Str;

class GenerateShortId
{
    private $project_id;
    private $project;
    private $short_id;

    public function __construct($project_id)
    {
        $this->project_id = $project_id;
    }

    public static function perform($project_id)
    {
        return (new static($project_id))->handle();
    }

    public function handle()
    {
        try {
            $this->init()->generateShortId();

            return [
                'status_code' => 200,
                'short_id'    => $this->short_id,
            ];
        }
        catch (\Exception $exception) {
            return [
                'status_code' => 422,
                'error' => $exception->getMessage(),
            ];
        }
    }

    public function init()
    {
        $this->project = Project::query()->find($this->project_id);
        if (!$this->project) {
            throw new \Exception('Project not found!');
        }

        return $this;
    }

    public function generateShortId()
    {
        $this->short_id = Str::slug($this->project->name);

        if (strlen($this->short_id) > 20) {
            $words = explode('-', $this->short_id);
            $this->short_id = '';

            foreach ($words as $word) {
                if (strlen($word) > 0) {
                    $this->short_id .= $word[0];
                }
            }
        }

        return $this;
    }
}
