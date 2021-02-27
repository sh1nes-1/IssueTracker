<?php

namespace App\Models\Issue;

use App\Models\ProgrammingLanguage;
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

    public function events()
    {
        return $this->hasMany(Event::class);
    }

    public function programmingLanguage()
    {
        return $this->belongsTo(ProgrammingLanguage::class);
    }
}
