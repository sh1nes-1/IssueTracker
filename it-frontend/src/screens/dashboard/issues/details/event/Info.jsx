import { Card, Divider, Typography, Layout } from 'antd';
import React from 'react';
import EventHeader from './components/Header';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { googlecode } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const { Title } = Typography;

var html = `
$content = $response->getContent();
if (is_array($content)) {
  $message .= isset($content['message']) ? ': ' . $content['message'] : '';
  $code = isset($content['code']) ? $content['code'] : $response->getStatusCode();
  <h1>return new RestException($message, $code, $response->getStatusCode());</h1>
} else {
  return new RestException($message, $response->getStatusCode(), $response->getStatusCode());
}  
`;

var stacktrace = `Exception: Could not retrieve number in /var/www/html/vendor/myle/estimator-php/src/Models/Documents/Validators/TLCLicenseTextReader.php:84
Stack trace:
#0 /var/www/html/vendor/myle/estimator-php/src/Models/Documents/Validators/TLCLicenseTextReader.php(37): Estimator\Models\Documents\Validators\TLCLicenseTextReader->init()
#1 /var/www/html/vendor/myle/estimator-php/src/Models/Documents/Validators/TLCLicenseTextReader.php(30): Estimator\Models\Documents\Validators\TLCLicenseTextReader->handle()
#2 /var/www/html/vendor/myle/estimator-php/src/Models/Documents/Validators/TLCLicense.php(64): Estimator\Models\Documents\Validators\TLCLicenseTextReader::perform()
#3 /var/www/html/vendor/myle/estimator-php/src/Models/Documents/Validators/TLCLicense.php(33): Estimator\Models\Documents\Validators\TLCLicense->checkNumber()
#4 /var/www/html/vendor/myle/estimator-php/src/Models/Documents/Validators/TLCLicense.php(26): Estimator\Models\Documents\Validators\TLCLicense->handle()
#5 /var/www/html/vendor/myle/estimator-php/src/Models/Documents/Actions/ValidateDocument.php(52): Estimator\Models\Documents\Validators\TLCLicense::perform()
#6 /var/www/html/vendor/myle/estimator-php/src/Models/Documents/Actions/ValidateDocument.php(33): Estimator\Models\Documents\Actions\ValidateDocument->validate()
#7 /var/www/html/vendor/myle/estimator-php/src/Models/Documents/Actions/ValidateDocument.php(26): Estimator\Models\Documents\Actions\ValidateDocument->handle()
#8 /var/www/html/vendor/myle/estimator-php/src/Models/Documents/Documents.php(34): Estimator\Models\Documents\Actions\ValidateDocument::perform()
#9 /var/www/html/app/Models/Robots/Documents/validate/Jobs/ValidateDocument.php(49): Estimator\Models\Documents\Documents->validate()
#10 /var/www/html/app/Models/Robots/Documents/validate/Jobs/ValidateDocument.php(36): App\Models\Robots\Documents\validate\Jobs\ValidateDocument->performTask()
#11 /var/www/html/vendor/laravel/framework/src/Illuminate/Container/BoundMethod.php(36): App\Models\Robots\Documents\validate\Jobs\ValidateDocument->handle()
#12 /var/www/html/vendor/laravel/framework/src/Illuminate/Container/Util.php(40): Illuminate\Container\BoundMethod::Illuminate\Container\{closure}()
#13 /var/www/html/vendor/laravel/framework/src/Illuminate/Container/BoundMethod.php(93): Illuminate\Container\Util::unwrapIfClosure()
#14 /var/www/html/vendor/laravel/framework/src/Illuminate/Container/BoundMethod.php(37): Illuminate\Container\BoundMethod::callBoundMethod()
#15 /var/www/html/vendor/laravel/framework/src/Illuminate/Container/Container.php(610): Illuminate\Container\BoundMethod::call()
#16 /var/www/html/vendor/laravel/framework/src/Illuminate/Bus/Dispatcher.php(128): Illuminate\Container\Container->call()
#17 /var/www/html/vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php(128): Illuminate\Bus\Dispatcher->Illuminate\Bus\{closure}()
#18 /var/www/html/vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php(103): Illuminate\Pipeline\Pipeline->Illuminate\Pipeline\{closure}()
#19 /var/www/html/vendor/laravel/framework/src/Illuminate/Bus/Dispatcher.php(132): Illuminate\Pipeline\Pipeline->then()
#20 /var/www/html/vendor/laravel/framework/src/Illuminate/Queue/CallQueuedHandler.php(118): Illuminate\Bus\Dispatcher->dispatchNow()
#21 /var/www/html/vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php(128): Illuminate\Queue\CallQueuedHandler->Illuminate\Queue\{closure}()
#22 /var/www/html/vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php(103): Illuminate\Pipeline\Pipeline->Illuminate\Pipeline\{closure}()
#23 /var/www/html/vendor/laravel/framework/src/Illuminate/Queue/CallQueuedHandler.php(120): Illuminate\Pipeline\Pipeline->then()
#24 /var/www/html/vendor/laravel/framework/src/Illuminate/Queue/CallQueuedHandler.php(70): Illuminate\Queue\CallQueuedHandler->dispatchThroughMiddleware()
#25 /var/www/html/vendor/laravel/framework/src/Illuminate/Queue/Jobs/Job.php(98): Illuminate\Queue\CallQueuedHandler->call()
#26 /var/www/html/vendor/laravel/framework/src/Illuminate/Queue/Worker.php(406): Illuminate\Queue\Jobs\Job->fire()
#27 /var/www/html/vendor/laravel/framework/src/Illuminate/Queue/Worker.php(356): Illuminate\Queue\Worker->process()
#28 /var/www/html/vendor/laravel/framework/src/Illuminate/Queue/Worker.php(158): Illuminate\Queue\Worker->runJob()
#29 /var/www/html/vendor/laravel/framework/src/Illuminate/Queue/Console/WorkCommand.php(116): Illuminate\Queue\Worker->daemon()
#30 /var/www/html/vendor/laravel/framework/src/Illuminate/Queue/Console/WorkCommand.php(100): Illuminate\Queue\Console\WorkCommand->runWorker()
#31 /var/www/html/vendor/laravel/horizon/src/Console/WorkCommand.php(50): Illuminate\Queue\Console\WorkCommand->handle()
#32 /var/www/html/vendor/laravel/framework/src/Illuminate/Container/BoundMethod.php(36): Laravel\Horizon\Console\WorkCommand->handle()
#33 /var/www/html/vendor/laravel/framework/src/Illuminate/Container/Util.php(40): Illuminate\Container\BoundMethod::Illuminate\Container\{closure}()
#34 /var/www/html/vendor/laravel/framework/src/Illuminate/Container/BoundMethod.php(93): Illuminate\Container\Util::unwrapIfClosure()
#35 /var/www/html/vendor/laravel/framework/src/Illuminate/Container/BoundMethod.php(37): Illuminate\Container\BoundMethod::callBoundMethod()
#36 /var/www/html/vendor/laravel/framework/src/Illuminate/Container/Container.php(610): Illuminate\Container\BoundMethod::call()
#37 /var/www/html/vendor/laravel/framework/src/Illuminate/Console/Command.php(136): Illuminate\Container\Container->call()
#38 /var/www/html/vendor/symfony/console/Command/Command.php(288): Illuminate\Console\Command->execute()
#39 /var/www/html/vendor/laravel/framework/src/Illuminate/Console/Command.php(121): Symfony\Component\Console\Command\Command->run()
#40 /var/www/html/vendor/symfony/console/Application.php(974): Illuminate\Console\Command->run()
#41 /var/www/html/vendor/symfony/console/Application.php(291): Symfony\Component\Console\Application->doRunCommand()
#42 /var/www/html/vendor/symfony/console/Application.php(167): Symfony\Component\Console\Application->doRun()
#43 /var/www/html/vendor/laravel/framework/src/Illuminate/Console/Application.php(93): Symfony\Component\Console\Application->run()
#44 /var/www/html/vendor/laravel/framework/src/Illuminate/Foundation/Console/Kernel.php(129): Illuminate\Console\Application->run()
#45 /var/www/html/artisan(37): Illuminate\Foundation\Console\Kernel->handle()
#46 {main}`;

function EventInfo() {
  return (
    <React.Fragment>
      <Divider />

      <EventHeader />

      <Divider />

      <div>
        <Title level={4}>Exception</Title>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid optio facere, labore vitae incidunt veniam nobis reprehenderit repellendus nihil doloremque illo officiis error rerum tempore sunt maiores ullam iusto! Tempora. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid optio facere, labore vitae incidunt veniam nobis reprehenderit repellendus nihil doloremque illo officiis error rerum tempore sunt maiores ullam iusto! Tempora. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid optio facere, labore vitae incidunt veniam nobis reprehenderit repellendus nihil doloremque illo officiis error rerum tempore sunt maiores ullam iusto! Tempora. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid optio facere, labore vitae incidunt veniam nobis reprehenderit repellendus nihil doloremque illo officiis error rerum tempore sunt maiores ullam iusto! Tempora.
      </div>
      
      <Card title="Crashed in ReactFragment.php at line 37" size="small" className="exception-code-card">
        <SyntaxHighlighter 
          language="php" 
          style={googlecode}
          showLineNumbers={true} 
          startingLineNumber={37}          
        >
          {html}
        </SyntaxHighlighter>
      </Card>

      <Card title="Stacktrace" size="small" className="event-stacktrace">
        <SyntaxHighlighter 
          language="plaintext" 
          style={googlecode}
          className="stacktrace-content"
        >
          {stacktrace}
        </SyntaxHighlighter>
      </Card>      
    </React.Fragment>
  );
}

export default EventInfo;