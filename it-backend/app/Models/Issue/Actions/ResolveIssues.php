<?php

namespace App\Models\Issue\Actions;

use App\Models\Issue\Issue;

class ResolveIssues
{
    private $user;
    private $issues_ids;
    private $issues;
    private $resolve;

    public function __construct($user, $issues_ids, $resolve)
    {
        $this->user = $user;
        $this->issues_ids = $issues_ids;
        $this->resolve = $resolve;
    }

    public static function perform($user, $issues_ids, $resolve)
    {
        return (new static($user, $issues_ids, $resolve))->handle();
    }

    public function handle()
    {
        try {
            $this->init()->resolve();

            return [
                'status_code' => 200,
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
        $this->issues = array_map(function($issue_id) {
            $issue = Issue::query()->find($issue_id);

            if (!$issue || !$issue->isUserAuthorized($this->user->id)) {
                throw new \Exception("You don't have permissions");
            }

            return $issue;
        }, $this->issues_ids);

        return $this;
    }

    public function resolve()
    {
        foreach ($this->issues as $issue) {
            $issue->resolve($this->resolve);
        }

        return $this;
    }
}
