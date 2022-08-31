---
title: '[Spring Boot] 의존성 주입(DI) 세 가지 방식'
uml: true
author_profile: true
toc_label: '[Spring Boot] 의존성 주입(DI) 세 가지 방식'
---

## 1. 설정자 기반 의존성 주입(Setter-based dependency injection)

```java
public class UserServiceImpl implements UserService {
    private UserRepository userRepository;
    private passwordEncoder passwordEncoder;

    // 설정자 의존성 주입 1
    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // 설정자 의존성 주입 2
    public void setPasswordEncoder(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }
}
```
