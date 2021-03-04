<?php

namespace App\Http\Requests\Issue;

use App\Models\Issue\Actions\IgnoreIssues;
use Illuminate\Foundation\Http\FormRequest;

class IgnoreIssuesRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'issues' => 'required|array',
            'issues.*' => 'exists:issues,id',
        ];
    }

    public function perform()
    {
        $user = auth()->user();
        $response = IgnoreIssues::perform($user, $this->get('issues'));
        if ($response['status_code'] !== 200) {
            return response()->json([
                'message' => 'Failed to ignore issues. Please try again later.',
                'error' => $response['error'],
            ], 422);
        }

        return response()->json(['message' => 'Issues successfully ignored'], 200);
    }
}
