<?php

namespace App\Repository;

use App\Entity\Task;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;
use App\Utility\Factory;
use Doctrine\ORM\EntityManagerInterface;

/**
 * @method Task|null find($id, $lockMode = null, $lockVersion = null)
 * @method Task|null findOneBy(array $criteria, array $orderBy = null)
 * @method Task[]    findAll()
 * @method Task[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class TaskRepository extends ServiceEntityRepository
{
    private $entityManager;

    public function __construct(
        ManagerRegistry $registry,
        EntityManagerInterface $entityManager    
    )
    {
        parent::__construct($registry, Task::class);
        $this->entityManager = $entityManager;
    }

    public function saveTask(Task $task): Task {

        if (is_null($task->getIsComplete())) {
            $task->setIsComplete(false);
        }

        $this->entityManager->persist($task);
        $this->entityManager->flush();
        return $task;
    }

    public function removeTask(Task $task) {
        $this->entityManager->remove($task);
        $this->entityManager->flush();
    }
}
