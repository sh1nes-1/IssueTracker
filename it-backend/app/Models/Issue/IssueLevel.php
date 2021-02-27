<?php

namespace App\Models\Issue;

use BenSampo\Enum\Enum;

final class IssueLevel extends Enum
{
    const INFO = 0;
    const WARNING = 1;
    const ERROR = 2;
}
