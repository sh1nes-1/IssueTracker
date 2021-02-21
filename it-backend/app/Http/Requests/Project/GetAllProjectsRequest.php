<?php

namespace App\Http\Requests\Project;

use App\Http\Responses\Project\GetAllProjectsResponse;
use App\Models\Project\Project;
use Illuminate\Foundation\Http\FormRequest;

class GetAllProjectsRequest extends FormRequest
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
        $projects = auth()->user()->projects;
        $projects_formatted = GetAllProjectsResponse::from($projects)->toArray();
        return response()->json($projects_formatted, 200);
    }
}
