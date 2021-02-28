<?php

namespace App\Models\Issue\Actions;

use App\Models\Project\Project;

class GetProjectIssues
{
    const ISSUES_PER_PAGE = 25;

    private $project_id;
    private $parameters;
    private $project;
    private $issues;
    private $total_count;

    public function __construct($project_id, $parameters)
    {
        $this->project_id = $project_id;
        $this->parameters = $parameters;
    }

    public static function perform($project_id, $parameters)
    {
        return (new static($project_id, $parameters))->handle();
    }

    public function handle()
    {
        try {
            $this->init()->getIssues();

            return [
                'status_code' => 200,
                'issues' => $this->issues,
                'total_count' => $this->total_count,
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
            throw new \Exception('Could not find project with given id');
        }

        return $this;
    }

    public function getIssues()
    {
        $issues_query = $this->project->issues();

        $environments_ids = $this->parameters['environments_ids'] ?? null;
        if ($environments_ids) {
            $environments_ids_arr = explode(',', $environments_ids);
            $issues_query->whereIn('project_environment_id', $environments_ids_arr);
        }

        $this->total_count = $issues_query->count();
        $issues_query->paginate(self::ISSUES_PER_PAGE);
        $this->issues = $issues_query->get();

        return $this;
    }
}
