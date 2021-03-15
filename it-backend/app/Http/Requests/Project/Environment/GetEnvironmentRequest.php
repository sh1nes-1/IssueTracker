<?php

namespace App\Http\Requests\Project\Environment;

use App\Http\Responses\Project\Environment\GetEnvironmentResponse;
use App\Models\Project\Environment\ProjectEnvironment;
use Illuminate\Foundation\Http\FormRequest;

class GetEnvironmentRequest extends FormRequest
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
            //
        ];
    }

    public function perform()
    {
        $environment_id = $this->route('id');
        $environment = ProjectEnvironment::query()->find($environment_id);

        if (!$environment) {
            return response()->json(['message' => 'Environment not found!'], 200);
        }

        $isUserAuthorized = $environment->isUserAuthorized(auth()->user()->id);
        if (!$isUserAuthorized) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        if ($environment->status !== 'active') {
            return response()->json(['message' => 'Environment is not active'], 422);
        }

        $environment_formatted = GetEnvironmentResponse::from($environment)->toArray();
        return response()->json($environment_formatted, 200);
    }
}
