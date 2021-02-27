<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\Validator;

class CsvArrayRule implements Rule
{
    private $fail_message;
    private $item_rules;

    /**
     * Create a new rule instance.
     * @param string $item_rules rule that will be applied to each element | example: numeric|min:0
     */
    public function __construct(string $item_rules)
    {
        $this->item_rules = $item_rules;
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        if (is_array($value)) {
            $this->fail_message = "$attribute can not be an array";
            return false;
        }

        if (is_string($value)) {
            $items = explode(',', $value);

            $validator = Validator::make([$attribute => $items], ["$attribute.*" => $this->item_rules]);
            if ($validator->fails()) {
                $this->fail_message = $validator->errors()->first();
                return false;
            }
        }

        return true;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return $this->fail_message;
    }
}
