<?php

namespace App\Http\Controllers\Issue;

use App\Http\Controllers\Controller;
use App\Http\Requests\Issue\CreateEventRequest;

class IssueController extends Controller
{
    public function __construct()
    {
        $this->middleware('verify.project.environment');
    }

    public function createEvent(CreateEventRequest $request)
    {
        return $request->perform();
    }
}
