<?php

namespace App\Models\Issue;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'issue_id',
        'stacktrace',
        'source_code_fragment',
        'fragment_starting_line',
        'line',
    ];
}
