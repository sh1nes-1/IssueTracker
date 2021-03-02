<?php

namespace App\Http\Requests\Project\Environment;

use App\Http\Responses\Project\Environment\GenerateNewSecretResponse;
use App\Models\Project\Environment\Actions\GenerateSecretKey;
use App\Models\Project\Environment\ProjectEnvironment;
use Illuminate\Foundation\Http\FormRequest;

class GenerateNewSecretRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        $id = $this->route('id');
        $project_environment = ProjectEnvironment::query()->find($id);
        return $project_environment && $project_environment->isUserAuthorized(auth()->user()->id);
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
        $secret_key_response = GenerateSecretKey::perform();
        if ($secret_key_response['status_code'] !== 200) {
            return response()->json(['message' => 'Failed to generate new secret. Please try again later.'], 422);
        }

        $id = $this->route('id');
        $environment = ProjectEnvironment::query()->find($id);
        $environment->update([
           'secret_key' =>  $secret_key_response['secret_key'],
        ]);

        $environment_formatted = GenerateNewSecretResponse::from($environment)->toArray();
        return response()->json($environment_formatted, 200);
    }
}
