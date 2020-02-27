<?php
namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class DefaultController extends AbstractController
{
    /**
     * @Route("/", name="_home", methods={"GET"})
     * @Route("/create", name="_create", methods={"GET"})
     * @Route("/edit/{id}", name="_edit", methods={"GET"})
     */
    public function number()
    {
        $number = random_int(0, 100);

        return $this->render("default/index.html.twig");
    }
}