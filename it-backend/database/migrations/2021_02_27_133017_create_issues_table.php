<?php


use App\Models\Issue\IssueLevel;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateIssuesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('issues', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_environment_id')->constrained();
            $table->foreignId('programming_language_id')->constrained();
            $table->string('short_id')->nullable();
            $table->string('level')->default(IssueLevel::ERROR);
            $table->string('exception_name', 255)->index();
            $table->string('filename', 500)->index();
            $table->string('message', 600)->index();
            $table->boolean('is_resolved')->default(false);
            $table->boolean('is_ignored')->default(false);
            $table->timestamps();
            $table->index(['created_at', 'updated_at']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('issues');
    }
}
