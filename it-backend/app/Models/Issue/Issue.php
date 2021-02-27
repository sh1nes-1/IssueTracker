<?php

namespace App\Models\Issue;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Issue extends Model
{
    use HasFactory;

    protected $fillable = [
        'project_environment_id',
        'programming_language_id',
        'short_id',
        'level',
        'exception_name',
        'filename',
        'message',
        'is_resolved',
    ];
}
