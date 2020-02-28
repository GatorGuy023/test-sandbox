<?php
namespace App\Controller;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use App\Entity\Task;
use App\Repository\TaskRepository;
use App\Utility\Factory;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class TaskController extends AbstractController {

    /**
     * @Route("/tasks", name="get_tasks", methods={"GET"})
     * @return JsonResponse
     */
    function getTasks(TaskRepository $repo) {
        $serializer = Factory::serializerFactory();
        $data = $repo->findAll();
        $data = ['task' => $data];
        $data = $serializer->serialize($data, 'json');
        $data = json_decode($data, true);

        return new JsonResponse($data);
    }

    /**
     * @Route("tasks/{id}", name="get_task", methods={"GET"})
     * @param $task - a task object of the passed in id from route
     * @return JsonResponse
     */
    function getTask(Task $task) {
        $serializer = Factory::serializerFactory();
        $result = [
            'task' => $task
        ];
        $result = $serializer->serialize($result, 'json');
        $result = json_decode($result, true);

        return new JsonResponse($result);
    }

    /**
     * @Route("/tasks", name="post_task", methods={"POST"})
     * @return JsonResponse
     */
    function postTask(
        Request $request, 
        ValidatorInterface $validator,
        TaskRepository $repo
    ) {
        $serializer = Factory::serializerFactory();
        $result = [
            'success' => false,
            'errors' => 'No json object found',
        ];

        if ($content = $request->getContent()) {
            $task = $serializer->deserialize($content, Task::class, 'json');
            $errors = $validator->validate($task);
            if (count($errors) > 0) {
                $result['errors'] = $errors;
            } else {
                $result['success'] = true;
                unset($result['errors']);
                $task = $repo->saveTask($task);
                $result['task'] = $task;
            }
        }

        $result = $serializer->serialize($result, 'json');
        $result = json_decode($result, true);

    return new JsonResponse($result);
    }

    /**
     * @Route("/tasks/{id}", name="put_task", methods={"PUT"})
     * @return JsonResponse
     */
    function putTask(
        Request $request, 
        Task $task, 
        ValidatorInterface $validator,
        TaskRepository $repo    
    ) {
        $serializer = Factory::serializerFactory();
        $return = [
            'success' => false,
            'errors' => 'Malformed message'
        ];

        if ($content = $request->getContent()) {
            $data = json_decode($content, true);
            if (isset($data['title']) && isset($data['isComplete']) && !is_null($task)) {
                $task->setTitle($data['title']);
                $task->setIsComplete($data['isComplete']);
                $errors = $validator->validate($task);
                if (count($errors) > 0) {
                    $result['errors'] = $errors;
                } else {
                    $result['success'] = true;
                    unset($result['errors']);
                    $task = $repo->saveTask($task);
                    $result['task'] = $task;
                }
            }
        }

        $result = $serializer->serialize($result, 'json');
        $result = json_decode($result, true);

        return new JsonResponse($result);
    }

    /**
     * @Route("/tasks/{id}", name="delete_task", methods={"DELETE"})
     * @return JsonResponse
     */
    function deleteTask(TaskRepository $repo, Task $task = null) {
        $result = [
            'success' => false,
            'errors' => 'Task not found',
        ];

        if (!is_null($task)) {
            $repo->removeTask($task);
            $result['success'] = true;
            unset($result['errors']);
        }

        return new JsonResponse($result);
    }
}