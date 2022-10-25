package com.ahaideas.ideasapi.model;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
    List<Comment> findByIdeaId(int ideaId);
}