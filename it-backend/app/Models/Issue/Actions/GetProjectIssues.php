<?php

namespace App\Models\Issue\Actions;

use App\Models\Project\Project;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

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

        if ($this->project->status !== 'active') {
            throw new \Exception('Project is not active');
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

        $search = $this->parameters['search'] ?? null;
        if (!empty(trim($search))) {
            $issues_query->where(function($query) use ($search) {
                $query->where('exception_name', 'LIKE', "%$search%")
                   ->orWhere('filename', 'LIKE', "%$search%")
                   ->orWhere('message', 'LIKE', "%$search%");
            });
        }

        $sort_by = $this->parameters['sort_by'] ?? 'last_seen';
        if ($sort_by === 'last_seen') {
            $issues_query->orderByDesc('updated_at');
        }

        $date_from = $this->parameters['date_from'] ?? null;
        if (!empty($date_from)) {
            $issues_query->where('issues.created_at', '>', Carbon::createFromFormat('Y-m-d H:i:s', $date_from)->toDateTimeString());
        }

        $date_to = $this->parameters['date_to'] ?? null;
        if (!empty($date_to)) {
            $issues_query->where('issues.updated_at', '<', Carbon::createFromFormat('Y-m-d H:i:s', $date_to)->toDateTimeString());
        }

        $is_resolved = $this->parameters['is_resolved'] ?? null;
        if ($is_resolved !== null) {
            $is_resolved = filter_var($is_resolved, FILTER_VALIDATE_BOOLEAN);
            $issues_query->where('is_resolved', $is_resolved);
        }

        $is_ignored = $this->parameters['is_ignored'] ?? null;
        if ($is_ignored !== null) {
            $is_ignored = filter_var($is_ignored, FILTER_VALIDATE_BOOLEAN);
            $issues_query->where('is_ignored', $is_ignored);
        }

        $this->total_count = $issues_query->count();
        $issues_query->paginate(self::ISSUES_PER_PAGE);
        $this->issues = $issues_query->get();

        return $this;
    }
}
