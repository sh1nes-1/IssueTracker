<?php

namespace App\Http\Requests\Issue;

use App\Models\Issue\Actions\ResolveIssues;
use Illuminate\Foundation\Http\FormRequest;

class ResolveIssuesRequest extends FormRequest
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
            'resolve' => 'nullable',
        ];
    }

    public function perform()
    {
        $user = auth()->user();

        $resolve = $this->get('resolve') ?? true;
        $resolve = filter_var($resolve, FILTER_VALIDATE_BOOLEAN);

        $response = ResolveIssues::perform($user, $this->get('issues'), $resolve);
        if ($response['status_code'] !== 200) {
            return response()->json([
                'message' => 'Failed to resolve issues. Please try again later.',
                'error' => $response['error'],
            ], 422);
        }

        return response()->json(['message' => 'Issues successfully resolved'], 200);
    }
}
