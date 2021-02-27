<?php

namespace App\Models\Issue\Actions;

use App\Models\Project\Project;
use Illuminate\Support\Str;

class GenerateShortId
{
    private $project_id;
    private $issue_id;
    private $project;
    private $short_id;

    public function __construct($project_id, $issue_id)
    {
        $this->project_id = $project_id;
        $this->issue_id = $issue_id;
    }

    public static function perform($project_id, $issue_id)
    {
        return (new static($project_id, $issue_id))->handle();
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
        $project_slug = Str::slug($this->project->name);

        if (strlen($project_slug) > 20) {
            $words = explode('-', $project_slug);
            $project_slug = '';

            foreach ($words as $word) {
                if (strlen($word) > 0) {
                    $project_slug .= $word[0];
                }
            }
        }

        $symbol_id = base_convert($this->issue_id, 10, 36);
        $this->short_id = strtoupper($project_slug . '-' . $symbol_id);

        return $this;
    }
}
