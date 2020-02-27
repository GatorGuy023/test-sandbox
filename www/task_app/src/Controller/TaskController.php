<?php
namespace App\Controller;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class TaskController extends AbstractController {

    /**
     * @Route("/tasks", name="get_tasks", methods={"GET"})
     * @return JsonResponse
     */
    function getTasks() {
        return new JsonResponse([
            'tasks' => []
        ]);
    }

    /**
     * @Route("tasks/{id}", name="get_task", methods={"GET"})
     * @return JsonResponse
     */
    function getTask() {
        return new JsonResponse([
            'task' => []
        ]);
    }

    /**
     * @Route("/tasks", name="post_task", methods={"POST"})
     * @return JsonResponse
     */
    function postTask() {
        return new JsonResponse([
            'success' => false,
            'errors' => 'Not implemented'
        ]);
    }

    /**
     * @Route("/tasks/{id}", name="put_task", methods={"PUT"})
     * @return JsonResponse
     */
    function putTask() {
        return new JsonResponse([
            'success' => false, 
            'errors' => 'Not implemented'
        ]);
    }

    /**
     * @Route("/tasks/{id}", name="delete_task", methods={"DELETE"})
     * @return JsonResponse
     */
    function deleteTask() {
        return new JsonResponse([
            'success' => false,
            'errors' => 'Not implemented'
        ]);
    }
}