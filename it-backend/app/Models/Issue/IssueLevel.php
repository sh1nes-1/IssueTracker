<?php

namespace App\Models\Issue;

use BenSampo\Enum\Enum;

final class IssueLevel extends Enum
{
    const INFO = 'info';
    const WARNING = 'warning';
    const ERROR = 'error';
}
