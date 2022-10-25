package com.ahaideas.ideasapi.model;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VoteRepository extends JpaRepository<Votes, Integer> {
    List<Votes> findByIdeaId(int ideaId);
}