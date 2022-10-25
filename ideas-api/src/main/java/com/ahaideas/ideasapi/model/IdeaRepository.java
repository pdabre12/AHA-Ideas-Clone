package com.ahaideas.ideasapi.model;

import org.springframework.data.jpa.repository.JpaRepository;

public interface IdeaRepository extends JpaRepository<Idea, Integer> {
}