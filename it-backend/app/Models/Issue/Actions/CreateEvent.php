<?php

namespace App\Models\Issue\Actions;

use App\Models\Issue\Issue;
use App\Models\ProgrammingLanguage;

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
        try {
            $this->findOrCreateProgrammingLang()->findOrCreateIssue()->createEvent();

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
            ->orderByDesc('created_at')
            ->first();

        if (!$this->issue) {
            $short_id_response = GenerateShortId::perform($this->parameters['project_id']);
            if ($short_id_response['status_code'] !== 200) {
                throw new \Exception('Failed to generate short id for project!');
            }

            $this->parameters['short_id'] = $short_id_response['short_id'];
            $this->issue = Issue::query()->create($this->parameters);
        }

        return $this;
    }

    public function createEvent()
    {
        if (!$this->issue) {
            return $this;
        }

        $this->issue->events()->create([
            'stacktrace' => $this->parameters['stacktrace'],
        ]);

        return $this;
    }
}
