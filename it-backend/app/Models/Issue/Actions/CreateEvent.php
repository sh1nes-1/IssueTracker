<?php

namespace App\Models\Issue\Actions;

use App\Models\Issue\Issue;
use App\Models\ProgrammingLanguage;
use App\Models\Project\Environment\ProjectEnvironment;
use Illuminate\Support\Facades\DB;

class CreateEvent
{
    private $parameters;
    private $issue;

    public function __construct($parameters)
    {
        $this->parameters = $parameters;
    }

    public static function perform($parameters)
    {
        return (new static($parameters))->handle();
    }

    public function handle()
    {
        DB::beginTransaction();
        try {
            $this->findOrCreateProgrammingLang()->findOrCreateIssue()->createEvent();

            DB::commit();

            return [
                'status_code' => 200,
            ];
        }
        catch (\Exception $exception) {
            DB::rollBack();

            return [
                'status_code' => 422,
                'error' => $exception->getMessage(),
            ];
        }
    }

    public function findOrCreateProgrammingLang()
    {
        $programming_language = ProgrammingLanguage::query()
            ->where('name', $this->parameters['programming_language'])
            ->first();

        if (!$programming_language) {
            $programming_language = ProgrammingLanguage::query()->create([
               'name' =>  $this->parameters['programming_language'],
            ]);
        }

        $this->parameters['programming_language_id'] = $programming_language->id;
        return $this;
    }

    public function findOrCreateIssue()
    {
        $this->issue = Issue::query()
            ->where('project_environment_id', $this->parameters['project_environment_id'])
            ->where('programming_language_id', $this->parameters['programming_language_id'])
            ->where('level', $this->parameters['level'])
            ->where('exception_name', $this->parameters['exception_name'])
            ->where('filename', $this->parameters['filename'])
            ->where('message', $this->parameters['message'])
            ->where('is_resolved', false)
            ->orderByDesc('created_at')
            ->first();

        if (!$this->issue) {
            $environment = ProjectEnvironment::query()->find($this->parameters['project_environment_id']);
            $env_issue_id = $environment->issues_count + 1;

            $short_id_response = GenerateShortId::perform($this->parameters['project_id'], $env_issue_id);
            if ($short_id_response['status_code'] !== 200) {
                throw new \Exception('Failed to generate short id for project!');
            }

            $this->parameters['short_id'] = $short_id_response['short_id'];
            $this->issue = Issue::query()->create($this->parameters);
            $environment->increment('issues_count');
        }

        // set updated_at => now()
        $this->issue->touch();

        return $this;
    }

    public function createEvent()
    {
        if (!$this->issue) {
            return $this;
        }

        $this->issue->events()->create([
            'stacktrace' => $this->parameters['stacktrace'],
            'source_code_fragment' => $this->parameters['source_code_fragment'] ?? null,
            'fragment_starting_line' => $this->parameters['fragment_starting_line'] ?? -1,
            'line' => $this->parameters['line'],
        ]);

        return $this;
    }
}
