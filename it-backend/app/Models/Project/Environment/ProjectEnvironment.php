<?php

namespace App\Models\Project\Environment;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProjectEnvironment extends Model
{
    use HasFactory;

    protected $fillable = [
        'project_id',
        'name',
        'secret_key',
    ];
}
