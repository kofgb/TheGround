package com.ssafy.theground.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="logos")
@AllArgsConstructor
@Getter
@Setter
public class Logo {
	
	@Id
	@Column(name="logo_seq")
	private Long logoSeq;
	
	@Column(name="logo_url")
	private String logoUrl;
	
}