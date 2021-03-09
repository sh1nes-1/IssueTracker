<?php

namespace App\Models\Issue;

use App\Models\ProgrammingLanguage;
use App\Models\Project\Environment\ProjectEnvironment;
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
        'is_ignored',
    ];

    public function events()
    {
        return $this->hasMany(Event::class);
    }

    public function programmingLanguage()
    {
        return $this->belongsTo(ProgrammingLanguage::class);
    }

    public function projectEnvironment()
    {
        return $this->belongsTo(ProjectEnvironment::class);
    }

    public function isUserAuthorized($user_id)
    {
        return $this->projectEnvironment->isUserAuthorized($user_id);
    }

    public function resolve($resolve = true)
    {
        $this->fill(['is_resolved' => $resolve])->save();
    }

    public function ignore($ignore = true)
    {
        $this->fill(['is_ignored' => $ignore])->save();
    }
}
