<?php

namespace App\Http\Controllers\Issue;

use App\Http\Controllers\Controller;
use App\Http\Requests\Issue\CreateEventRequest;
use App\Http\Requests\Issue\GetAllIssuesRequest;

class IssueController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth.check', ['except' => 'createEvent']);
        $this->middleware('verify.project.environment', ['only' => 'createEvent']);
    }

    public function index(GetAllIssuesRequest $request)
    {
        return $request->perform();
    }

    public function createEvent(CreateEventRequest $request)
    {
        return $request->perform();
    }
}
